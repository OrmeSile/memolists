import {TypeButton} from "@/components/home/components/Row/TypeButton";

export const RowType = ({
                          type,
                          onButtonClick,
                          disabled
                        }: {
  type: string,
  onButtonClick: () => void,
  disabled: boolean
}) => {

  return (
    <TypeButton type={type} onClick={onButtonClick}
                disabled={disabled}
    />
  )
}