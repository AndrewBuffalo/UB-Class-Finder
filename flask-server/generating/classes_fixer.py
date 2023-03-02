#THIS FILE IS TO CHANGE THE UB_CLASSES.CSV FILE INTO SOMETHING THAT THE DATABASE CAN USE 
#REMOVE THE UNUSABLE DATES, SPLIT INTO A START AND END DATE AND REMOVE AN EXTRA SPACE WHEN SPLITING 
#THE IRR:

#CERTAIN CLASSES HAVE MORE THAN 1 MEETING PLACE
#CERTAIN PLACES LOCATIONS ARE ARR
#DATES ARE TBA
#ROOM OR DATES COMPLETELY EMPTY
#1 DATE OR LOCATION SHOWN BUT NOT THE OTHER
#HIGHER PRIORITY WHEN LOCATION IS REMOTE (COMPLETELY REMOVE FROM LIST)

#summary 
#ROOM CAN BE : COMPLETELY EMPTY, REMOTE, 2 FIELDS, ARR, TBA
#OR
#DATE CAN BE : COMPLETELY EMPTY, REMOTE, 2 FIELDS, ARR, TBA
#THINGS THAT CAN STILL BE SOLVED ARE THE 2 FIELDS SITUATION 
#COMPLETELY REMOVE ANY FIELD WHICH HAS :
#EMPTY IN ONE OF THEM
#REMOTE IN ONE OF THEM 
#ARR IN ONE OF THEM
#TBA IN ONE OF THEM
#time : multiple meeting patterns
#room c

#iterate through the file first to remove the unfixables
#iterate again to fix the fixable
#split the 2 dates
#remove first fields space
#put into database in a seperate file
import csv 
import re
from datetime import datetime
#GOOD DAYS DONT HAVE "TBA, EMPTY"
#GOOD TIMES HAVE REGEX "AM/PM TO AM/PM"
#GOOD CAMPUSES HAVE NORTH/SOUTH OR DOWNTOWN
#GOOD ROOOMS DONT HAVE "REMOTE/ ARR/SEE CLASS DETAIL/EMPTY/MAI??/ ROOM HAS 2??/FUTURE TERM CSS/SQUIRE 99999?/ON CAMPUS- TBD (CSS)
# OFF CA 00/TO BE DETERMINED/OFF CAMPUS-OVERSEAS/TO BE DETERMINED(HEALTHSCI)/"


rooms = []
with open("ub_classes.csv","w",newline= '') as f:
    with open("classes_1.csv", "r") as p:
        reader = csv.reader(p)
        writer = csv.writer(f)
        possible_campus = ["North Campus", "South Campus", "Downtown Campus"]
        bad_day = ["", "TBA"]
        bad_rooms = ["Remote","ARR","See class detail","","Off Ca 99999","Future Term CSS","Squire 99999","On Campus - TBD (CSS)","Off Ca 00","To Be Determined","Off Campus - Overseas","To Be Determined (HealthSci)"]
        re_time = " [0-9]{1,2}:[0-9]{1,2} (PM|AM) - [0-9]{1,2}:[0-9]{1,2} (PM|AM)" # 12:30 PM - 1:50 PM
        slash_times = 0
        for line in reader: #index : 7 is room, 5 is day, 6 is time (regex),8 is campus
            if ((line[8] in possible_campus) and (line[5] not in bad_day) and (  (line[7] not in bad_rooms) and not(re.search('/',line[7]))  ) and (re.search(re_time,line[6])) ): #filter out the bad elements
                writer.writerow((line[0],line[1],line[2],line[3],line[4],line[5],line[6],line[7],line[8],line[9],line[10]))
            elif (re.search('/',line[7])): #class with 2 different classrooms (Grein 134C/135C Academ 102/102A Furnas 416/417 Furnas 810/811)
                two_rooms = line[7].split(" ")
                room_number = two_rooms[1].split("/")
                room_name = two_rooms[0] #Furnas, Academ..
                col_7 = [room_name + " " + room_number[0],room_name + " " +room_number[1] ]
                writer.writerow((line[0],line[1],line[2],line[3],line[4],line[5],line[6],col_7[0],line[8],line[9],line[10]))
                writer.writerow((line[0],line[1],line[2],line[3],line[4],line[5],line[6],col_7[1],line[8],line[9],line[10]))
                slash_times+=1
        #print(slash_times)

#BAD ROOMS:
#Remote
#ARR
#See class detail
#Empty
#Off Ca 99999
#Grein 134C/135C Academ 102/102A Furnas 416/417 Furnas 810/811 SPLIT
#Future Term CSS
#Squire 99999
#On Campus - TBD (CSS)
#Off Ca 00
#To Be Determined
#Off Campus - Overseas
#To Be Determined (HealthSci)
with open("ub_classes_db.csv", "w", newline= '') as w:
    with open("ub_classes.csv") as r:
        reader = csv.reader(r)
        writer = csv.writer(w)
        for line in reader:
            old_time = line[6]
            old_time_space = old_time.split(" ")
            beginning = old_time_space[1] + " " + old_time_space[2]
            ending = old_time_space[4] + " " + old_time_space[5]
            #print(beginning, ending)
            writer.writerow((line[0],line[1],line[2],line[3],line[4],line[5],beginning,ending,line[7],line[8],line[9],line[10]))

    
with open("ub_classes_query.csv","w", newline='') as w:
    with open("ub_classes_db.csv") as r:
        reader = csv.reader(r)
        writer = csv.writer(w)
        for line in reader:
            beginning = line[6]
            ending = line[7]
            beginning_object = datetime.strptime(beginning, '%I:%M %p')
            beginning = datetime.strftime(beginning_object, "%H:%M:%S")
            ending_object = datetime.strptime(ending, '%I:%M %p')
            ending = datetime.strftime(ending_object, "%H:%M:%S")
            #print(beginning,ending)
            #print(line[11])
            writer.writerow((line[0],line[1],line[2],line[3],line[4],line[5],beginning,ending,line[8],line[9],line[10],line[11]))
