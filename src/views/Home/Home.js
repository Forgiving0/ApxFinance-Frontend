import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    // background: url(${HomeImage}) no-repeat !important;
    // background-size: cover !important;
    background-color: #181821;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const StyledLink = styled.a`
font-weight: 700;
text-decoration: none;
`;

const CustomCard = styled(Card)`
border-radius: 3px!important;
background: #1f1f2b !important;
`;

const Home = () => {
  console.log('debug rendering this')
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('APEX-FTM-LP');
  const tShareFtmLpStats = useLpStats('ASHARE-FTM-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'APEX-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'ASHARE-FTM-LP' });



  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'APEX-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'ASHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <div className="animateme">
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <Typography style={{color:'#fff'}} align="left" variant="h5" gutterBottom>
        Welcome to Apex Finance
      </Typography>
      <Grid  container spacing={3}>

        {/* TVL */}
        <Grid item xs={12} sm={5}>
          <CustomCard style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '17px' }} >
              <Typography style={{color:'#fff'}}>Total Value Locked</Typography>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </CustomCard>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={7} >
          <CustomCard style={{ height: '100%'}}>
            <CardContent style={{ paddingBottom: '-10px', paddingLeft: '30px'}}>
              <p>
                Any investment that offers medium to high rewards has risks, and yield farming is no different.
                Please visit our documentation before purchasing our Apex assets.
              </p>
            </CardContent>
          </CustomCard>
        </Grid>

        {/* APEX */}
        <Grid item xs={12} sm={4}>
          <CustomCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Typography style={{color:'#fff'}} variant="h5" gutterBottom>
                APEX
              </Typography>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('APEX');
                }}

                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >

                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>

                  <TokenSymbol symbol="APEX" />
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </CustomCard>
        </Grid>

        {/* ASHARE */}
        <Grid item xs={12} sm={4}>
          <CustomCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Typography style={{color:'#fff'}} variant="h5" gutterBottom>
                ASHARE
              </Typography>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('ASHARE');
                }}

                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >

                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                  <TokenSymbol symbol="ASHARE" />
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply}
              </span>
            </CardContent>
          </CustomCard>
        </Grid>

        {/* ABOND */}
        <Grid item xs={12} sm={4}>
          <CustomCard>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Typography style={{color:'#fff'}} variant="h5" gutterBottom>
                ABOND
              </Typography>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('ABOND');
                }}


                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >

                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                  <TokenSymbol symbol="ABOND" />
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </CustomCard>
        </Grid>
        {/*<Grid item xs={12} sm={6}>*/}
        {/*  <CustomCard>*/}
        {/*    <CardContent align="center">*/}
        {/*      <h2 style={{ color: 'white' }}>APEX-FTM Spooky LP</h2>*/}
        {/*      <Box mt={2}>*/}
        {/*        <CardIcon>*/}
        {/*          <TokenSymbol symbol="APEX-FTM-LP" />*/}
        {/*        </CardIcon>*/}
        {/*      </Box>*/}
        {/*      <Box mt={2}>*/}
        {/*        <Button color="primary" disabled={true} onClick={onPresentTombZap} variant="contained">*/}
        {/*          Zap In*/}
        {/*        </Button>*/}
        {/*      </Box>*/}
        {/*      <Box mt={2}>*/}
        {/*        <span style={{ fontSize: '26px' }}>*/}
        {/*          {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} APEX /{' '}*/}
        {/*          {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} FTM*/}
        {/*        </span>*/}
        {/*      </Box>*/}
        {/*      <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>*/}
        {/*      <span style={{ fontSize: '12px' }}>*/}
        {/*        Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />*/}
        {/*        Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}*/}
        {/*      </span>*/}
        {/*    </CardContent>*/}
        {/*  </CustomCard>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12} sm={6}>*/}
        {/*  <CustomCard>*/}
        {/*    <CardContent align="center">*/}
        {/*      <h2>ASHARE-FTM Spooky LP</h2>*/}
        {/*      <Box mt={2}>*/}
        {/*        <CardIcon>*/}
        {/*          <TokenSymbol symbol="ASHARE-FTM-LP" />*/}
        {/*        </CardIcon>*/}
        {/*      </Box>*/}
        {/*      <Box mt={2}>*/}
        {/*        <Button color="primary" onClick={onPresentTshareZap} variant="contained">*/}
        {/*          Zap In*/}
        {/*        </Button>*/}
        {/*      </Box>*/}
        {/*      <Box mt={2}>*/}
        {/*        <span style={{ fontSize: '26px' }}>*/}
        {/*          {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} ASHARE /{' '}*/}
        {/*          {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} FTM*/}
        {/*        </span>*/}
        {/*      </Box>*/}
        {/*      <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>*/}
        {/*      <span style={{ fontSize: '12px' }}>*/}
        {/*        Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}*/}
        {/*        <br />*/}
        {/*        Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}*/}
        {/*      </span>*/}
        {/*    </CardContent>*/}
        {/*  </CustomCard>*/}
        {/*</Grid>*/}
      </Grid>
    </Page>
  );
};

export default Home;
