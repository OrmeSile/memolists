import Image from "next/image";
import {useState} from "react";
import movie from "@/public/icons/dazzle/film.svg"
export const RowType = () => {
  const [imageSource, setImageSource] = useState('')
  return (
    <>
      <button style={{height : '3rem', width: '3rem'}}>
        <Image src={movie}
               alt={"movie icon"}
               width={0}
               height={0}
               sizes={'100vw'}
               style={{ width: '100%', height: 'auto' }} // optional
        />
      </button>
    </>
  )
}