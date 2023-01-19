from datetime import datetime, timedelta,date

beginning = datetime.now()
print(datetime.strftime(beginning + timedelta(hours = 6), '%H:%M:%S'))
print(date.today().weekday())
print( datetime.now().strftime('%A'))
