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
driver.get("https://www.buffalo.edu/class-schedule?semester=spring")
#hierarchy for finding an HTML Element is ID -> name -> Class Sss
try:
    driver.implicitly_wait(5)   
    i = 6
    with open("undergraduate_classes.csv","a") as f:
            fieldnames = ["Class","Course","Title","Section","Type","Days","Time","Room","Location","Instructor (*) Additionl Instructor", "Status"]
            writer = csv.DictWriter(f, fieldnames= fieldnames)
            writer.writeheader()
            print("test")
            while( i!= 129):
                table = driver.find_element_by_xpath(f'/html[1]/body[1]/table[4]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[{i}]')
                link_click = table.text.split(" ")
                del link_click[-1]
                link_click[0:len(link_click)] = [' '.join(link_click[0:len(link_click)])]
                link_click = link_click[0].split(" ")
                link_click[0:len(link_click)] = [' '.join(link_click[3:-2])]
                link = driver.find_element_by_link_text(link_click[0]) #getting the string to click on
                link.click()
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
                        for div in rows:
                            writer.writerow(div)
                    counter +=1
                driver.back()
                i+=1
    driver.quit()
except:
    print("Error")
    driver.quit()



def any_available_class(current_time):
    return 

def is_class_available(room_name):
    return 