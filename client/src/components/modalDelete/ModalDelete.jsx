import React from 'react'
import { Modal } from 'antd';

const ModalDelete = ({ isModalVisible, handleOk, handleCancel, action }) => {

    return (
        <>
            <Modal title="Delete Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                Do you want to {action}?
            </Modal>
        </>
    );
}

export default ModalDelete;