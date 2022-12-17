#This file will be the script to get all the data parsed into a CSV file for the 
#UNDERGRADUATE classes
from selenium import webdriver


PATH = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(PATH)
driver.get("https://www.buffalo.edu/class-schedule?semester=spring")