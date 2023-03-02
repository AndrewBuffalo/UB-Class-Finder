#this file converts from a current day to a M T W R F S format
#   from datetime import datetime

def converter(monday_date):
    if monday_date == "Monday":
        return "M"
    if monday_date == "Tuesday":
        return "T"
    if monday_date == "Wednesday":
        return "W"
    if monday_date == "Thursday":
        return "R"
    if monday_date == "Friaday":
        return "F"
    if monday_date == "Saturday":
        return "S"
    if monday_date == "Sunday":
        return "Su"

def prints(string):
    print(string)
