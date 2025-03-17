// components
import Circles from '/components/Circles';

import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    if (response.ok) {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className='h-full bg-primary/30'>
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        <div className='flex flex-col w-full max-w-[700px]'>
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>connect.</span>
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            <div className='flex gap-x-6 w-full'>
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' className='input' required />
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' className='input' required />
            </div>
            <input type='text' name='subject' value={formData.subject} onChange={handleChange} placeholder='Subject' className='input' required />
            <textarea name='message' value={formData.message} onChange={handleChange} placeholder='Message' className='textarea' required />

            <button
              type='submit'
              className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'
              disabled={loading}
            >
              {loading ? 'Sending...' : (
                <>
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                    Let&apos;s talk
                  </span>
                  <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
                </>
              )}
            </button>
          </motion.form>

          {success === true && <p className='text-green-500 mt-4'>Message sent successfully!</p>}
          {success === false && <p className='text-red-500 mt-4'>Failed to send message.</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
