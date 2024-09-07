import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const sendMessage = () => {
    form.validateFields()
      .then((values) => {
        const { name, surname, number } = values;

        const token = "7288526920:AAH-vd_HYqMjr_qE5zG6idFBNxfFeMi9aFo";
        const chat_id = 6801549705;
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const messageText = `Ism: ${name}\nFamiliya: ${surname}\nNumber: +998${number}`;

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id,
            text: messageText,
          }),
        })
          .then(res => res.json())
          .then(res => {
            message.success("Yuborildi");
            setOpen(false);
            form.resetFields();
          })
          .catch(err => {
            console.error(err);
            message.error("Yuborishda xatolik yuz berdi");
          });
      })
      .catch(() => {
        message.error("Iltimos, barcha maydonlarni to'ldiring!");
      });
  };

  const showModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className='max-w-[1200px] mx-auto p-[20px] justify-center'>
      <Button className='home-btn' onClick={showModal}>
        Foydalanuvchi ma'lumotlarini yuboring
      </Button>
      <Modal open={open} footer={null} onCancel={closeModal}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Ismingizni kiriting' },
              { min: 4, message: 'Ismingiz kamida 4 ta harfdan iborat bo\'lishi kerak' }
            ]}
          >
            <Input placeholder='Ismingizni kiriting' />
          </Form.Item>
          <Form.Item
            name="surname"
            rules={[
              { required: true, message: 'Familiyangizni kiriting' },
              { min: 4, message: 'Familiyangiz kamida 4 ta harfdan iborat bo\'lishi kerak' }
            ]}
          >
            <Input placeholder='Familiyangizni kiriting' />
          </Form.Item>
          <Form.Item
            name="number"
            rules={[
              { required: true, message: 'Raqamingizni kiriting' },
              { len: 9, message: 'Raqamingiz 9 ta raqamdan iborat bo\'lishi kerak' },
              { pattern: /^[0-9]+$/, message: 'Faqat raqam kiriting' }
            ]}
          >
            <Input addonBefore="+998" placeholder='Raqamingizni kiriting (9 ta raqam)' />
          </Form.Item>
          <Button onClick={sendMessage} type="primary">
            Yuborish
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
