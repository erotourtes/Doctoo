import { useState } from 'react';
import SettingsPopup from '../settingsPopup/settingsPopup';
import { useAppSelector } from '@/app/hooks';
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

  return (
    <>
      <div className='settings h-screen w-full'>
        <header className='settings__header flex w-full items-center gap-2 p-9 pl-20 max-sm:justify-center  max-sm:pl-0  '>
          <Icon variant='settings' className='text-main '></Icon> <h1 className='text-2xl '>Settings</h1>
        </header>

        <section className='mb-5 flex items-center justify-center'>
          <div className='for-password h-[88px] w-11/12 rounded-lg bg-white'>
            <div className='settings__header flex items-center justify-between gap-2 p-8'>
              <span className='text-lg font-medium text-grey-1'>Password</span>
              <a href='#' className='text-lg font-medium text-main ' onClick={() => setShowPopup(true)}>
                Change password
              </a>
            </div>
          </div>
        </section>
        {showPopup && <SettingsPopup handleClosePopup={() => setShowPopup(false)} />}
        <section className='flex items-center justify-center'>
          <div className='for-password h-[226px] w-11/12 rounded-lg bg-white max-sm:h-[240px] '>
            <div className='pl-6 pr-6 pt-7'>
              <div className='settings__header  h-12 border-b border-grey-4 '>
                <div className=' flex items-center justify-between  '>
                  <span className='text-lg font-medium text-grey-1'>Send e-mail notifications</span>
                  <a href='#' className='text-lg text-main '>
                    <Toggle
                      selected={patient.emailNotificationToggle}
                      onSelectedChange={handleEmailNotificationToggleChange}
                      label=''
                      id='emailNotificationToggle'
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className='pl-6 pr-6 pt-4'>
              <div className='settings__header  h-12 border-b border-grey-4 max-sm:h-16'>
                <div className=' flex items-center justify-between  '>
                  <span className='text-lg font-medium text-grey-1'>Turn on two-factor authentication</span>
                  <a href='#' className='text-lg text-main '>
                    <Toggle
                      selected={patient.twoFactorAuthToggle}
                      onSelectedChange={handleTwoFactorAuthToggleChange}
                      label=''
                      id='twoFactorAuthToggle'
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className='pl-6 pr-6 pt-4'>
              <div className='settings__header   h-12 '>
                <div className=' flex items-center justify-between  '>
                  <span className='text-lg font-medium text-grey-1'>Request approval for bill payment</span>
                  <a href='#' className='text-lg text-main '>
                    <Toggle
                      selected={patient.requestBillPaymentApproval}
                      onSelectedChange={handleBillPaymentToggleChange}
                      label=''
                      id='billPaymentToggle'
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Settings;
