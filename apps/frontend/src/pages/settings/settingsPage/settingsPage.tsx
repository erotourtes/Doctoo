import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import SettingsPopup from '../settingsPopup/settingsPopup';
import { Icon, Toggle } from '@/components/UI';

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [patient, setPatient] = useState(useAppSelector(state => state.patient.data));

  const handleEmailNotificationToggleChange = () => {
    setPatient(prevPatient => ({
      ...prevPatient,
      emailNotificationToggle: !prevPatient.emailNotificationToggle,
    }));
  };

  const handleTwoFactorAuthToggleChange = () => {
    setPatient(prevPatient => ({
      ...prevPatient,
      twoFactorAuthToggle: !prevPatient.twoFactorAuthToggle,
    }));
  };

  const handleBillPaymentToggleChange = () => {
    setPatient(prevPatient => ({
      ...prevPatient,
      requestBillPaymentApproval: !prevPatient.requestBillPaymentApproval,
    }));
  };

  const settingsData = [
    {
      id: 'emailNotification',
      label: 'Send e-mail notifications',
      toggleState: patient.emailNotificationToggle,
      toggleHandler: handleEmailNotificationToggleChange,
    },
    {
      id: 'twoFactorAuth',
      label: 'Turn on two-factor authentication',
      toggleState: patient.twoFactorAuthToggle,
      toggleHandler: handleTwoFactorAuthToggleChange,
    },
    {
      id: 'billPayment',
      label: 'Request approval for bill payment',
      toggleState: patient.requestBillPaymentApproval,
      toggleHandler: handleBillPaymentToggleChange,
    },
  ];

  return (
    <>
      <div className='flex h-screen w-full flex-col gap-4'>
        <header className='mb-[9px] mt-[3px] flex w-full items-center gap-2'>
          <Icon variant='settings' className='text-main '></Icon> <h1 className='text-2xl '>Settings</h1>
        </header>

        <section className='flex items-center justify-center'>
          <div className='for-password h-[88px] w-11/12 w-full rounded-lg bg-white'>
            <div className='flex flex-col items-center justify-between gap-2 p-2 sm:flex-row sm:p-8'>
              <span className='text-dark-grey text-base text-lg font-medium'>Password</span>
              <a href='#' className='text-lg font-medium text-main ' onClick={() => setShowPopup(true)}>
                Change password
              </a>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center'>
          <div className='for-password w-full rounded-lg bg-white p-2 sm:px-8 sm:py-4'>
            {settingsData.map(({ id, label, toggleState, toggleHandler }) => (
              <div key={id} className='p-2 sm:px-2 sm:py-0'>
                <div className={`${id !== 'billPayment' ? ' border-b border-grey-4' : ''}`}>
                  <div className='mb-3 flex items-center justify-between sm:mb-0 sm:px-0 sm:py-4'>
                    <span className='text-dark-grey text-base text-sm font-medium sm:text-lg'>{label}</span>
                    <a href='#' className='text-lg text-main '>
                      <Toggle selected={toggleState} onSelectedChange={toggleHandler} label='' id={id} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showPopup && <SettingsPopup showPopup={showPopup} handleClosePopup={() => setShowPopup(false)} />}
    </>
  );
};

export default Settings;
