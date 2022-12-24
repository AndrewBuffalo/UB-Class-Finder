import re



my_string = " 12:30 PM - 1:50 PM  12:30 PM - 1:50 PM"
result = re.findall(" [0-9]{1,2}:[0-9]{2} (PM|AM) - [0-9]{1,2}:[0-9]{2} (PM|AM)",my_string)
print(result)