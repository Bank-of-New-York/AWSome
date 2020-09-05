
from models import SPFH
from db import session

import pandas as pd
import time
import sys


df = pd.read_excel("sp500.xlsx")
name_list = df['Ticker'].tolist()

log = open("allspfh.log", "a")
sys.stdout = log

def get_all_spfh(name_list):
    start = time.time()

    name_spfh_list = {}
    n_added = 0

    for name in name_list:
        # If no problem, add the s&p500 stock
        spfh = SPFH.create(name)
        if spfh != None:
            name_spfh_list[name] = spfh

        session.add(spfh)
        session.commit()

        reged_spfh = session.query(SPFH).filter(SPFH.name == name).first()
        if not reged_spfh:
            print("SPFH stock {} doesn't exist".format(name))
        else:
            n_added += 1
            
        time.sleep(1)

    end = time.time()
    print(f"Time elapsed: {round(end-start,2)}, added {n_added} times")
    return name_spfh_list
    
shorter_name_list = name_list[:5]
print(shorter_name_list)
print(get_all_spfh(shorter_name_list))
