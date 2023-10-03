rm schema.prisma;
for f in ./schemas/*.part.prisma;
do
filename=${f##*/};
printf "//********** %s **********//\n\n" "$filename" >> schema.prisma;
cat "$f" >> schema.prisma;
done;