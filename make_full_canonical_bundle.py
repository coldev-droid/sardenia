import os, json, hashlib, zipfile, re

with open('generate_bundle.py', 'r') as f:
    code = f.read()

# Let's write the full calibration script to generate the 24 files
