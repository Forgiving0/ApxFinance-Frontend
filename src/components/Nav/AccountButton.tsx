import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';

interface AccountButtonProps {
  text?: string;
}

const CustomBtn = styled(Button)`
    border-radius: 3px!important;
    border-color: #1FE7ABFF !important;
    height: 40px;
    &:hover {
      background-color: #7bedd2 !important;
    }
  `;

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const accountEllipsis = account ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : null;
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Connect Wallet';

  return (
    <div>
      {!account ? (
        <CustomBtn onClick={handleWalletProviderOpen} color="primary" variant="contained">
          <p style={{color: '#212121'}}>{buttonText}</p>
        </CustomBtn>
      ) : (
        <CustomBtn  color="primary" variant="contained" onClick={onPresentAccountModal}>
          <p style={{color: '#212121', fontSize: '18px'}}><b>{accountEllipsis}</b></p>
        </CustomBtn>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
