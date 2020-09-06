from flask_restful import reqparse, abort, Resource, fields, marshal_with

from models import SPFH
from db import session
from sqlalchemy import func, or_, and_
from sqlalchemy.orm import aliased
from sqlalchemy.sql import label
import pandas as pd
import time

parser = reqparse.RequestParser()

parser.add_argument('name', type=str)
parser.add_argument('id', type=int)
parser.add_argument('names_sep_comma', type=str)

spfh_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'bb_id': fields.String,
    'yf_id': fields.String,

    'market_cap': fields.Float,
    'total_asset': fields.Float,
    'debt': fields.Float,
    'gross_profit': fields.Float,
    'beta': fields.Float,

    'revenue_3y_bk': fields.Float,
    'revenue_1y_bk': fields.Float,
    'revenue_1y_fd': fields.Float,

    'current_pe': fields.Float,
    'est_peg': fields.Float,
    'dividend': fields.Float,
    'ave_vol': fields.Float,

    'gpta': fields.Float,
    'ave_sales_growth': fields.Float,
    'debt_to_mcap': fields.Float,

    'gpta_rank': fields.Integer,
    'beta_rank': fields.Integer,
    'ave_sales_growth_rank': fields.Integer,
    'debt_to_mcap': fields.Integer,
    'final_score': fields.Float
}

message_field = {
    "message": fields.String
}

messages_field = {
    "message": fields.List(fields.String)
}

add_multiple_spfh_fields = {
    'rej_list': fields.List(fields.Nested({"name": fields.String, "error": fields.String})), 
    'added_list': fields.List(fields.String)
}

row_fields = {
    'row': fields.Integer
}

name_fields = {
    'name': fields.String
}


class MultipleSPFH(Resource):

    @marshal_with(spfh_fields)
    def get(self):
        return session.query(SPFH).all()

    @marshal_with(add_multiple_spfh_fields)
    def post(self):
        args = parser.parse_args()
        names_sep_comma = args['names_sep_comma']

        if names_sep_comma is None or names_sep_comma == '':
            abort(400, message="names list is empty")
        
        name_list = [word.strip() for word in names_sep_comma.split(',')]
        rej_list = []
        added_list =[]

        for name in name_list:

            if name is None or name == '':
                rej_list.append({"name": name,
                                "error": "Invalid name"})
                continue
            if session.query(SPFH).filter_by(name = name).first() is not None:
                rej_list.append({"name": name,
                                "error": "Stock already exists"})
                continue

            # If no problem, add the s&p500 stock
            spfh = SPFH.create(name)
            if spfh == None:
                rej_list.append({"name": name,
                                "error": "Invalid ID"})
                continue

            session.add(spfh)
            session.commit()

            reged_spfh = session.query(SPFH).filter(SPFH.name == name).first()
            if not reged_spfh:
                print("SPFH stock {} doesn't exist".format(name))
                rej_list.append({"name": name,
                                "error": "Not added successfully"})
            else:
                added_list.append(name)
                
            time.sleep(2)

        return {'rej_list': rej_list, 'added_list': added_list}


    # @marshal_with(message_field)
    # def delete(self):
    #     return {"message": "are u sure? uncomment"}
        # try:
        #     num_rows_deleted = session.query(SPFH).delete()
        #     session.commit()
        #     return {"message": "{} number of row(s) deleted.".format(num_rows_deleted)}
        # except:
        #     session.rollback()

class RankSPFH(Resource):

    @marshal_with(messages_field)
    def post(self):
        '''
        Ranks the 4 metrics GPTA, Ave Sales Growth, Beta, and Debt to MCAP in respective attributes
        '''
        spfh1 = aliased(SPFH)
        subq = session.query(func.count(spfh1.gpta)).filter(spfh1.gpta > SPFH.gpta).as_scalar()
        session.query(SPFH).update({"gpta_rank": subq + 1}, synchronize_session=False)

        subq = session.query(func.count(spfh1.ave_sales_growth)).filter(spfh1.ave_sales_growth > SPFH.ave_sales_growth).as_scalar()
        session.query(SPFH).update({"ave_sales_growth_rank": subq + 1}, synchronize_session=False)
        
        subq = session.query(func.count(spfh1.beta)).filter(spfh1.beta > SPFH.beta).as_scalar()
        session.query(SPFH).update({"beta_rank": subq + 1}, synchronize_session=False)
        
        subq = session.query(func.count(spfh1.name)).filter(spfh1.debt/spfh1.market_cap > SPFH.debt/SPFH.market_cap).as_scalar()
        session.query(SPFH).update({"debt_to_mcap": subq + 1}, synchronize_session=False)
        session.commit()

        first_gpta_spfh = session.query(SPFH).filter(SPFH.gpta_rank == 1).first()
        first_growth_spfh = session.query(SPFH).filter(SPFH.ave_sales_growth_rank == 1).first()
        first_beta_spfh = session.query(SPFH).filter(SPFH.beta_rank == 1).first()
        first_debt_to_mcap_spfh = session.query(SPFH).filter(SPFH.debt_to_mcap == 1).first()
        
        return_dict = {"message": []}
        if not first_gpta_spfh:
            return_dict['message'].append("GPTA does not have rank 1")
        
        if not first_growth_spfh:
            return_dict['message'].append("Ave Growth Rate does not have rank 1")
        
        if not first_beta_spfh:
            return_dict['message'].append("Beta does not have rank 1")

        if not first_debt_to_mcap_spfh:
            return_dict['message'].append("Debt to MCAP does not have rank 1")
            
        return return_dict

    def get(self):
        '''
        Calculates the final score of each stock according to the rank for 4 metrics,
        each metrics is given a maximum score of 25
        '''
        n_rows = session.query(SPFH.name).count()
        divide_rank_by = n_rows / 25

        session.query(SPFH).update({"final_score": (n_rows + 1 - SPFH.gpta_rank) / divide_rank_by +
                                (n_rows + 1 - SPFH.ave_sales_growth_rank) / divide_rank_by +
                                (n_rows + 1 - SPFH.beta_rank) / divide_rank_by +
                                (n_rows + 1 - SPFH.debt_to_mcap) / divide_rank_by}, synchronize_session=False)
        session.commit()

        final_spfh = session.query(SPFH).filter(SPFH.final_score >= 0).first()
        
        return_dict = {"message": []}
        if not final_spfh:
            return_dict['message'].append("Final Score not added")

        return return_dict


class OneSPFH(Resource):
    @marshal_with(spfh_fields)
    def post(self):
        args = parser.parse_args()
        name = args['name']

        if name is None or name == '':
            abort(400, message="Couldn't create the name")
        if session.query(SPFH).filter_by(name = name).first() is not None:
            abort(404, message="Stock {} already exist".format(name))

        spfh = SPFH.create(name)

        if spfh == None:
            abort(404, message="stock not found with {} as query".format(name))

        session.add(spfh)
        session.commit()

        reged_spfh = session.query(SPFH).filter(SPFH.name == name).first()
        if not reged_spfh:
            abort(404, message="SPFH stock {} doesn't exist".format(name))
        return reged_spfh


    @marshal_with(spfh_fields)
    def get(self):
        args = parser.parse_args()
        name = args['name']

        if name is None:
            abort(400, message="Couldn't find the name")

        spfh = session.query(SPFH).filter_by(name = name).first()
        if spfh is None:
            abort(404, message="stock {} does not exist".format(name))
            
        return spfh

    @marshal_with(message_field)
    def delete(self):
        args = parser.parse_args()
        name = args['name']

        if name is None:
            abort(400, message="Couldn't find the name")

        spfh = session.query(SPFH).filter_by(name = name).first()
        if spfh is None:
            abort(404, message="stock {} does not exist".format(name))

        try:
            num_rows_deleted = session.query(SPFH).filter_by(name = name).delete()
            session.commit()
            return {"message": "{} number of row(s) deleted.".format(num_rows_deleted)}
        except:
            session.rollback()


