import { ModalProps } from 'antd/lib/modal/Modal';
import { closeModal, showModal, ShowModalCompProps } from '.';
export function useShowModal<R, P = Record<string, any>>(
  Modal: React.FC<ShowModalCompProps<P>>,
  modalArgs: P,
  modalProps: ModalProps = {},
) {


    return {
        showModal:()=>{
          return  showModal<R,P>(Modal,modalArgs,modalProps)
        },
        closeModal:()=>{
            return closeModal(Modal)
        }
    }

}
