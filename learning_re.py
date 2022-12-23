import re



my_string = "Send an email from this@email.com to test@user.com 34 times"
result = re.findall(".+",my_string)
print(result)