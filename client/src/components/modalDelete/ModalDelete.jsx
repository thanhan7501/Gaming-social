import React from 'react'
import { Modal } from 'antd';

const ModalDelete = ({ isModalVisible, handleOk, handleCancel, action }) => {

    return (
        <>
            <Modal title={action} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                Do you want to delete this post ?
            </Modal>
        </>
    );
}

export default ModalDelete;