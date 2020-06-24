file="data.json"
rm $file
echo "[" > $file
for i in {1..6000}
do
   text=`lorem --bible -s 1 --randomize | tr '\n' ' '`
   echo "{\"id\": $i, \"title\": \"$text\"}," >> $file
done
text=`lorem --bible -s 1 --randomize | tr '\n' ' '`
echo "{\"id\": $(($i+1)), \"title\": \"$text\"}" >> $file
echo "]" >> $file