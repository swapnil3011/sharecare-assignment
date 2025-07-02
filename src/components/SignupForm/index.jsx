import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import iconBook from '../../assets/icon-book.svg'
import iconMail from '../../assets/icon-mail.svg'

import controlStyles from '../BaseControl/styles.module.scss';
import styles from './styles.module.scss';

import Image from '../../components/Image'
import BaseInput from '../BaseInput';
import BaseSelect from '../BaseSelect';
import { useToast } from '../ToastMessage/ToastContext';

function defaultFormData() {
  return {
    fullName: '',
    mailingAddress: '',
    city: '',
    state: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    email: '',
  }
}

function SignupForm() {
  const [formData, setFormData] = useState(defaultFormData());
  const {
    control,
    trigger,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'all',
    defaultValues: formData,
  });

  const { showToast } = useToast();

  const [index, setIndex] = useState(0);

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    await new Promise((r) => setTimeout(r, Math.random() * 2000 + Math.random() * 1000));
    showToast('Form submitted successfully!');
    reset();
    setIndex(index + 1);
  };

  function isValidPastDate(dateStr) {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = dateStr.match(dateRegex);
    if (!match) return 'Please enter date in DD-MM-YYYY format';

    const [_, day, month, year] = match.map(Number);
    const date = new Date(year, month - 1, day);

    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValidDate) return 'Invalid date';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today || 'DOB should be a valid past date';
  }


  return (
    <form
      key={index}
      className={styles['signup-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles['group-wrapper']}>
        <div className={styles['wrapper-title']}>
          <div style={{ width: '32px', height: '28px' }}>
            <Image
              src={iconBook}
              aria-hidden="true"
            />
          </div>

          <span>Your Information</span>
        </div>

        <hr />

        <BaseInput
          name="fullName"
          label="Full Name"
          placeholder="Enter first and last name"
          methods={{
            control,
            trigger,
          }}
          rules={{
            required: 'Full name is required',
            validate: (value) => value.trim().split(/\s+/).length >= 2 || 'Please enter first and last name',
          }}
        />

        <BaseInput
          name="mailingAddress"
          label="Mailing Address"
          placeholder="Enter your mailing address"
          methods={{
            control,
            trigger,
          }}
          rules={{ required: 'Mailing Address is required' }}
        />

        <div className={controlStyles['group-inputs']}>
          <BaseInput
            name="city"
            label="City"
            placeholder="Enter city"
            methods={{
              control,
              trigger,
            }}
            rules={{ required: 'City is required' }}
          />

          <BaseInput
            name="state"
            label="State"
            placeholder="Enter state"
            methods={{
              control,
              trigger,
            }}
            rules={{ required: 'State is required' }}
          />
        </div>

        <BaseInput
          type="tel"
          maxLength={10}
          inputMode="tel"
          name="mobileNumber"
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          autoComplete="mobile"
          methods={{
            control,
            trigger,
          }}
          rules={{
            required: 'Mobile Number is required',
            validate: (value) => {
              if (!/^\d+$/.test(value)) {
                return 'Mobile Number must contain only digits';
              }

              if (value.length !== 10) {
                return 'Mobile Number must be exactly 10 digits';
              }

              return true;
            },
          }}
        />

        <BaseInput
          name="dateOfBirth"
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          methods={{
            control,
            trigger,
          }}
          rules={{
            required: 'DOB is required',
            validate: isValidPastDate,
          }}

        />

        <BaseSelect
          className={controlStyles['no-border']}
          name="gender"
          label="Gender"
          methods={{
            control,
            trigger,
          }}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
            { value: 'prefer_not_to_say', label: 'Prefer not to say' },
          ]}
          rules={{ required: 'Please select a gender' }}
        />
      </div>

      <div className={styles['group-wrapper']} style={{ marginTop: '20px' }}>
        <BaseInput
          name="email"
          label="Email"
          placeholder="Enter your email address"
          autoComplete="email"
          methods={{
            control,
            trigger,
          }}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          className={controlStyles['no-border']}
        />
      </div>

      <button
        type="submit"
        className={clsx(
          styles['submit-btn'],
          isSubmitting && styles['loading'],
        )}
      >
        <div style={{ width: '32px', height: '28px' }}>
          <Image
            src={iconMail}
            aria-hidden="true"
          />
        </div>
        <span>Continue with Email</span>
      </button>
    </form>
  )
}

export default SignupForm
