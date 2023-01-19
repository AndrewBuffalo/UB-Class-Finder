from flask import Flask
from flask import render_template, request, redirect, make_response 
from datetime import datetime, timedelta
import sqlite3
from pytz import timezone
from converter import converter

app = Flask(__name__)

@app.route("/", methods = ['GET', 'POST'])
def index():
    tz = timezone('EST') 
    current_time = datetime.now(tz)
    result = {}
    south_campuslist = []
    north_campuslist = []
    down_townlist = []
    conn = sqlite3.connect("ub_classes.sqlite")
    c = conn.cursor()
    current_time_4 = current_time - timedelta(hours=4)
    hm = current_time + timedelta(hours = 10)
    #SOUTH CAMPUS START
    c.execute('''SELECT * FROM classes WHERE location = 'South Campus' ''')
    for i in c.fetchall():
        south_campuslist.append(i)
        #u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'South Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''',(datetime.strftime(current_time, "%H:%M:%S"), 
        datetime.strftime(current_time_4, "%H:%M:%S"),
        datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        if converter(datetime.now().strftime('%A')) in str(i[5]): #MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
            south_campuslist.remove(i)
    result['South Campus'] = south_campuslist
    #SOUTH CAMPUS END
    
    #NORTH CAMPUS START
    c.execute('''SELECT * FROM classes WHERE location = 'North Campus' ''')
    for i in c.fetchall():
        north_campuslist.append(i)
        #u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'North Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''',(datetime.strftime(current_time, "%H:%M:%S"), 
        datetime.strftime(current_time_4, "%H:%M:%S"),
        datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        if converter(datetime.now().strftime('%A')) in str(i[5]): #MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
            north_campuslist.remove(i)
    result['North Campus'] = north_campuslist
    #NORTH CAMPUS END 

    #DOWNTOWN START
    c.execute('''SELECT * FROM classes WHERE location = 'Downtown Campus' ''')
    for i in c.fetchall():
        down_townlist.append(i)
        #u+=1
    c.execute('''SELECT * FROM classes WHERE location = 'Downtown Campus'                                   
                                         AND beginning_time <= (?)
                                         AND beginning_time>= (?)
                                         AND ending_time > (?)
    ''',(datetime.strftime(current_time, "%H:%M:%S"), 
        datetime.strftime(current_time_4, "%H:%M:%S"),
        datetime.strftime(current_time, "%H:%M:%S")))
    for i in c.fetchall():
        if converter(datetime.now().strftime('%A')) in str(i[5]): #MAKE SURE THAT IT WAS ON THE SAME DAY BEFORE DELETE AND THAT THE END > CURRENT TIME:
            down_townlist.remove(i)
    result['Downtown Campus'] = down_townlist
    #DOWNTOWN END 
    print(len(result['North Campus']) + len(result['South Campus']) + len(result['Downtown Campus']))
    return render_template('index.html',title = 'Class Finder', result = result, current_time_4 = current_time_4, current_time = current_time)

@app.route("/classes")
def homepage():
  return make_response(render_template("homepage.html")) 




if __name__ == '__main__':
    app.run(debug = True)