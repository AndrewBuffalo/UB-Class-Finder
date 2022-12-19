#This file will be the script to get all the data parsed into a CSV file for the 
#UNDERGRADUATE classes
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

PATH = "C:\Program Files (x86)\chromedriver.exe"
driver_service = Service(executable_path=PATH)
driver = webdriver.Chrome(service = driver_service)
driver.get("https://www.buffalo.edu/class-schedule?semester=spring")
#hierarchy for finding an HTML Element is ID -> name -> Class Sss
try:
    driver.implicitly_wait(5)   
    table = driver.find_element_by_xpath("/html[1]/body[1]/table[4]/tbody[1]/tr[1]/td[1]")
    print(table.text)
    driver.quit()
except:
    print("error")
    driver.quit()


#main = driver.find_elements(by=By.ID, value= "skip-to-content-link")