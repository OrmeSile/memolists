SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
rm "${SCRIPT_DIR}/schema.prisma";
for f in "${SCRIPT_DIR}"/schemas/*.part.prisma;
do
filename=${f##*/};
printf "//********** %s **********//\n\n" "$filename" >> "${SCRIPT_DIR}"/schema.prisma;
cat "$f" >> "${SCRIPT_DIR}"/schema.prisma;
done;