type List = {
  id: string,
  title: string,
  userId: string,
  position: {
    x: number,
    y: number
  }
  isLastActive: boolean,
  rows : Row[]
}

interface ListSinglePayload {
  type: 'add' | 'change',
  payload: List
}

interface ListMultiplePayload {
  type: 'init',
  payload: List[]
}

type ListPayload = ListSinglePayload | ListMultiplePayload