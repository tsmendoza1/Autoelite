import requests
import json

url = "http://localhost:8999/api/auth/login"
headers = {"Content-Type": "application/json"}
data = {"username": "admin", "password": "admin123"}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    try:
        j = response.json()
        print(f"Error: {j.get('error')}")
        print(f"Message: {j.get('message')}")
        # print(f"Trace: {j.get('trace')}") # Trace might be huge
    except:
        print(f"Response Text: {response.text}")
except Exception as e:
    print(f"Error: {e}")
