#/bin/env python3.5
# Read MW_text and change it to js variable output file.
#

infile = open('../MW_veg_text.txt','r') #open text
outfile = open('MW_text_var.js','w') #open output js file

outfile.write('var MW_text = [\n')

for line in infile.readlines():
    line=line.replace("\'","\\'")
    outfile.write("'<p class=cent> "+line.strip()+" </p> <p class=bottom> [Press spacebar to advance to next page or backspace to return to previous page] </p>',\n")

outfile.write('\n];')
infile.close()
outfile.close()
