from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api

from resources import Home
from resources import Register
from resources import Token
from resources import HomeAuth
from resources import StockTrend
from resourcesSPFH import OneSPFH, MultipleSPFH
from resourcesUpdateUser import UpdateUser
from resources import Database
from resources import GeneralNews

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


api.add_resource(Home, '/')
api.add_resource(Register, '/api_register')
api.add_resource(Token, '/api_token')
api.add_resource(HomeAuth, '/api_home_auth')
api.add_resource(OneSPFH, '/api_one_spfh')
api.add_resource(MultipleSPFH, '/api_multiple_spfh')
api.add_resource(StockTrend, '/api_stock_trends')
api.add_resource(Database, '/api_database') # Http DELETE
api.add_resource(UpdateUser, '/api_update_user')
api.add_resource(GeneralNews, '/api_general_news')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
