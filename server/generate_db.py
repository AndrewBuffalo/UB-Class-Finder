import requests
import sqlite3


def getCoursesInDept(dept="CSE"):
    r = requests.get("https://www.buffalo.edu/class-schedule", params={
        "switch": "search",
        "searchtype": "daytime",
        "semester": "spring",
        "division": "UGRD",
        "dept": dept,
        "day": "any",
        "time": "any"
    })

    # preprocessing to get and clean class list table
    content = ''.join(r.text.replace("&nbsp;","").splitlines()[180:])
    x = content.index(">", content.index("<table"))+1
    content = content[x: content.index("</table>")]

    # Get raw tr content
    rawRows = []

    while len(content):
        endOfStart = content.index(">", content.index("<tr"))+1
        beginningOfEnd = content.index("</tr>")
        rawRows += [content[endOfStart:beginningOfEnd].strip()]
        content = content[beginningOfEnd + len("</tr>"):].strip()

    # get heading names (become JSON keys)
    raw_titles = rawRows[3]
    titles = []
    while len(raw_titles):
        endOfStart = raw_titles.index(">", raw_titles.index("<td"))+1
        beginningOfEnd = raw_titles.index("</td>")
        titles += [raw_titles[endOfStart:beginningOfEnd].strip()]
        raw_titles = raw_titles[beginningOfEnd + len("</td>"):].strip()

    # Process all class data
    raw_courses = rawRows[4:]
    courses = []
    for raw_course in raw_courses:
        course_data = []
        for i in range(len(titles)):
            endOfStart = raw_course.index(">", raw_course.index("<td"))+1
            beginningOfEnd = raw_course.index("</td>")
            course_data += [raw_course[endOfStart:beginningOfEnd].strip()]
            raw_course = raw_course[beginningOfEnd + len("</td>"):].strip()
        course = dict(zip(titles,course_data))
        # Extra processing
        course["Time"] = ' - '.join(map(lambda x: x.strip(), course["Time"].split("-")))
        if course["Course"][0] == "<":
            linkOpen = course["Course"].index(">", course["Course"].index("<a"))+1
            linkClose = course["Course"].index("</a>")
            course["Course"] = course["Course"][linkOpen:linkClose]
        course["Room"] = course["Room"].upper()
        # Store course
        courses += [course]
    return courses

# Store data in file for server use

DEPARTMENTS = ["AAS","ASL","AMS","APY","ARI","ARC","AED","ART","AHI","AS","BCH","BIO","BE","BMI","BMS","BPH","STA","CE","CHE","CHI","CIE","CL","COM","CDS","CHB","COL","CDA","CSE","CPM","CEP","DAC","ECO","ELP","EE","EAS","ENS","ENG","ELI","EVS","END","EEH","ES","FR","MGG","GEO","GLY","GER","GGS","GSE","GR","GRE","HEB","HIN","HIS","HON","IDS","IE","SSC","ITA","JPN","JDS","KOR","LAT","LAW","LAI","ULC","LIS","LIN","MGA","MGT","MGE","MGF","MGI","MGM","MGO","MGQ","MGS","MDI","MTH","MAE","DMS","MT","MCH","MIC","MLS","MUS","MTR","NEU","NRS","NMD","NTR","OT","ORB","MGB","PAS","PDO","PER","PHC","PMY","PHM","PHI","PT","PHY","PGY","POL","PSC","POR","PSY","PUB","REC","RSC","RSP","NBC","RLL","RUS","SCN","SW","SOC","SPA","STB","TH","TUS","UBC","NSG","UBE"]

import json

if __name__ == "__main__":
    courses = []
    conn = sqlite3.connect(r'./ub_classes.sqlite')
    cur = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS classes')
    cur.execute('''
    CREATE TABLE "classes"(
        "Class" TEXT,
        "Course" TEXT,
        "Title" TEXT,
        "Section" TEXT,
        "Type" TEXT,
        "Days" TEXT,
        "Time" TIME,
        "Room" TEXT,
        "Location" TEXT,
        "Instructors" TEXT,
        "Status" TEXT
    )
    ''')
    for dept in DEPARTMENTS:
        cur.execute("begin")
        for course in getCoursesInDept(dept):
            cur.execute('''INSERT INTO classes (Class,Course,Title,Section,Type,Days,Time,Room,Location,Instructors,Status) VALUES (?,?,?,?,?,?,?,?,?,?,?)''',(course['Class'],course['Course'],course['Title'],course['Section'],course['Type'],course['Days'],course['Time'],course['Room'],course['Location'],course['Instructor (*) additional instructors'],course['Status']))
        conn.execute("commit")
        print(f"Inserted courses in {dept=}")
    print("Done!")