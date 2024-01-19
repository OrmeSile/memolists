import Image from "next/image";
import movie from "@/public/icons/dazzle/film.svg";
import text from "@/public/icons/dazzle/pen-line.svg";
import rowStyles from "@/styles/home/row.module.css"

export const TypeButton = ({
                             type,
                             onClick,
                             disabled
                           }: {
  type: string,
  onClick: () => void,
  disabled?: boolean
}) => {
  const imageSwitch = (imageType: string) => {
    switch (imageType) {
      case 'movie' :
        return (<Image src={movie}
                       alt={"movie icon"}
                       width={0}
                       height={0}
                       sizes={'100vw'}
                       style={{width: '100%', height: '100%'}}
        />)
      case 'text' :
        return (<Image src={text}
                       alt={"movie icon"}
                       width={0}
                       height={0}
                       sizes={'100vw'}
                       style={{width: '100%', height: '100%'}}
        />)
      default :
        return undefined
    }
  }
  return (
    <button disabled={disabled} className={rowStyles.typeButton}
            onClick={() => onClick()}>
      {imageSwitch(type)}
    </button>
  )
}