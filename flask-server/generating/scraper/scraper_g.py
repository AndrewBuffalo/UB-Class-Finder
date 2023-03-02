#This file will be the script to get all the data parsed into a CSV file for the 
#GRADUATE classes
#This file will be the script to get all the data parsed into a CSV file for the 
#UNDERGRADUATE classes
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import csv
import time

PATH = "C:\Program Files (x86)\chromedriver.exe"
driver_service = Service(executable_path=PATH)
driver = webdriver.Chrome(service = driver_service)
driver.get("https://www.buffalo.edu/class-schedule?semester=spring&division=2")
#hierarchy for finding an HTML Element is ID -> name -> Class Sss
try:
    driver.implicitly_wait(5)   
    i = 6
    with open("classes_1.csv","a",newline= '') as f:
            #fieldnames = ["Class","Course","Title","Section","Type","Days","Time","Room","Location","Instructor (*) Additional Instructor", "Status"]
            #writer = csv.DictWriter(f, fieldnames= fieldnames)
            #writer.writeheader()
            writer = csv.writer(f)
            #print("test")
            while( i!= 149):
                #print("hey")
                table = driver.find_element_by_xpath(f'/html[1]/body[1]/table[4]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[{i}]')
                #print("hey")
                link_click = table.text.split(" ")
                del link_click[-1]
                #print(33)
                link_click[0:len(link_click)] = [' '.join(link_click[0:len(link_click)])]
                link_click = link_click[0].split(" ")
                link_click[0:len(link_click)] = [' '.join(link_click[3:-2])]
                #print(37)
                link = driver.find_element_by_link_text(link_click[0]) #getting the string to click on
                link.click()
                #print(38)
                #do stuff 
                #get all of the data 
                class_table = driver.find_elements_by_xpath("/html[1]/body[1]/table[4]/tbody[1]/tr")
                #print(len(class_table))
                counter = 0
                for ind_class in class_table:
                    if (counter >= 3 and ind_class.text not in "   Class   Course   Title   Section   Type   Days   Time   Room   Location   Instructor (*) additional instructors   Status   "):
                        rows = ind_class.text.split("   ")
                        if (len(rows) != 11):
                            #fix by merging
                            rows[9:-1] = [' '.join(rows[9:-1])]
                        #ALL rows are 11 columns right now so transfer to csv by writerowing
                        writer.writerow(((rows[0].replace("  ", "")), rows[1],rows[2],rows[3],rows[4],rows[5],rows[6],rows[7],rows[8],rows[9],rows[10]))
                    counter +=1
                driver.back()
                i+=1
    driver.quit()
except Exception as e :
    print("Error")
    print(e)
    driver.quit()



def any_available_class(current_time):
    return 

def is_class_available(room_name):
    return 