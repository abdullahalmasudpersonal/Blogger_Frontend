import Navber from '@/component/Navber/Navber';
import { Box } from '@mui/material';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navber />
            <Box>{children}</Box>
        </>
    );
};

export default CommonLayout;