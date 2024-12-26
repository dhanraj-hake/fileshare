from requests import get, post, put, patch, delete


API_URL = 'http://127.0.0.1:8080'

# Testing Get ALl Files 
def get_all_files():
    files_res = get(API_URL)
    print(files_res.json())

# Create new file

def create_file():
    new_file = {
        "name": "example.txt",
        "path": "/files/example.txt",
        "type": "text/plain",
        "size": "15KB"
    }

    files_res = post(API_URL, json=new_file)
    print(files_res.json())


# Get File By Id
def get_file_by_id(id):
    file_res = get(f'{API_URL}/{id}')
    if(file_res.ok):
        print(file_res.json())
    else:
        print(f'Error: {file_res.status_code}')


get_all_files()
# create_file()

# get_file_by_id(5)