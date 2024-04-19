import { Toggle } from '@/components/UI/Toggle';
import Icon from '@/components/icons/Icon';
import { useState } from 'react';

const Settings = () => {
  const [emailNotificationToggle, setEmailNotificationToggle] = useState(false);
  const [twoFactorAuthToggle, setTwoFactorAuthToggle] = useState(false);
  const [billPaymentToggle, setBillPaymentToggle] = useState(false);

  const handleEmailNotificationToggleChange = () => {
    setEmailNotificationToggle(!emailNotificationToggle);
  };

  const handleTwoFactorAuthToggleChange = () => {
    setTwoFactorAuthToggle(!twoFactorAuthToggle);
  };

  const handleBillPaymentToggleChange = () => {
    setBillPaymentToggle(!billPaymentToggle);
  };

  return (
    <>
      <div className='settings h-screen bg-background'>
        <header className='settings__header flex w-11/12 items-center gap-2 p-9 pl-20 max-sm:justify-center'>
          <Icon variant='settings' className='text-main '></Icon> <h1 className='text-2xl '>Settings</h1>
        </header>

        <section className='mb-5 flex items-center justify-center'>
          <div className='for-password h-[88px] w-11/12 rounded-lg bg-white'>
            <div className='settings__header flex items-center justify-between gap-2 p-8'>
              <span className='text-lg font-medium text-grey-1'>Password</span>
              <a href='#' className='text-lg font-medium text-main '>
                Change password
              </a>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center'>
          <div className='for-password h-[226px] w-11/12 rounded-lg bg-white max-sm:h-[240px] '>
            <div className='pl-6 pr-6 pt-7'>
              <div className='settings__header  h-12 border-b border-grey-4 '>
                <div className=' flex items-center justify-between  '>
                  <span className='text-lg font-medium text-grey-1'>Send e-mail notifications</span>
                  <a href='#' className='text-lg text-main '>
                    <Toggle
                      selected={emailNotificationToggle}
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
                      selected={twoFactorAuthToggle}
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
                      selected={billPaymentToggle}
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
