
from models import SPFH
from db import session

import pandas as pd
import time
import sys


df = pd.read_excel("sp500.xlsx")
name_list = df['Ticker'].tolist()

log = open("allspfh.log", "a")
sys.stdout = log

def get_all_spfh(name_list, readd_list=[]):
    start = time.time()
    print("Started at:", time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start)))

    # Delete all to be re-added
    for readd in readd_list:
        spfh = session.query(SPFH).filter_by(name = readd).first()
        if spfh is not None:
            try:
                num_rows_deleted = session.query(SPFH).filter_by(name = readd).delete()
                session.commit()
                print(f"{readd} deleted. {num_rows_deleted} rows deleted")
            except:
                session.rollback()
            

    added_list = []
    rej_list = []
    n_added = 0

    name_list.extend(readd_list)

    for name in name_list:
        # If no problem, add the s&p500 stock
        spfh = SPFH.create(name)
        if spfh == None:
            rej_list.append(("ID invalid", name))
            continue

        if session.query(SPFH).filter_by(name = name).first() is not None:
            rej_list.append(("Stock already exists", name))
            continue

        added_list.append(name)
        session.add(spfh)
        session.commit()

        reged_spfh = session.query(SPFH).filter(SPFH.name == name).first()
        if not reged_spfh:
            print("SPFH stock {} doesn't exist".format(name))
        else:
            n_added += 1
            
        time.sleep(2)

    end = time.time()
    print(f"Time elapsed: {round(end-start,2)}, added {n_added} times")
    print(f"Rejected: {rej_list}")
    return added_list
    
readd_list = [] # To be customised
shorter_name_list = name_list[12:50]
# combined_name_list = rej_list + shorter_name_list
print("Readding these:", readd_list)
print("Adding these in progress:", shorter_name_list)
print(get_all_spfh(shorter_name_list, readd_list))
