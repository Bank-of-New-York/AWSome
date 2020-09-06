from flask_restful import reqparse, abort, Resource, fields, marshal_with

from models import SPFH
from db import session
import pandas as pd
import time

parser = reqparse.RequestParser()

parser.add_argument('name', type=str)
parser.add_argument('id', type=int)
parser.add_argument('names_list', type=list)

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

add_multiple_spfh_fields = {
    'name_rejects': fields.List(fields.String),
    'n_added': fields.Integer
}


class MultipleSPFH(Resource):
    # @marshal_with(add_multiple_spfh_fields)
    # def post(self):
    #     args = parser.parse_args()
    #     names_list = args['names_list']

    #     if names_list is None or names_list == []:
    #         abort(400, message="names list is empty")
        
    #     name_rejects = []
    #     n_added = 0

    #     for name in names_list:
    #         print(name)
    #         continue

    #         if name is None or name == '':
    #             name_rejects.append(name)
    #             continue
    #         if session.query(SPFH).filter_by(name = name).first() is not None:
    #             name_rejects.append(name)
    #             continue

    #         # If no problem, add the s&p500 stock
    #         spfh = SPFH.create(name)

    #         if spfh == None:
    #             name_rejects.append(name)
    #             continue

    #         session.add(spfh)
    #         session.commit()

    #         # Check that successfully added
    #         reged_spfh = session.query(SPFH).filter(SPFH.name == name).first()
    #         if not reged_spfh:
    #             name_rejects.append(name)
    #         else:
    #             n_added += 1

    #     return {'name_rejects': name_rejects, 'n_added': n_added}


    @marshal_with(message_field)
    def delete(self):
        try:
            num_rows_deleted = session.query(SPFH).delete()
            session.commit()
            return {"message": "{} number of row(s) deleted.".format(num_rows_deleted)}
        except:
            session.rollback()

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

