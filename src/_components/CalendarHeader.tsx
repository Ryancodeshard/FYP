'use client'

import { DateInfo } from "@/_hooks/useDate";
import { Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarHeaderProps {
    date: DateInfo
}
const CalendarHeader = (props: CalendarHeaderProps) => {
    const { date } = props;
    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <AppBar
                position="static"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '64px',
                    backgroundColor: 'white',
                    borderBottom: 1,
                    borderColor: 'grey.500',
                    boxShadow: 0,
                }}
            >
                <Toolbar>
                    <Button sx={{border: 1, borderColor: 'black' }} onClick={date.getCurrentMonth}>
                        <Typography variant="body1" sx={{ color: 'black', fontSize: '14px' }}>
                            Today
                        </Typography>
                    </Button>
                    <Box sx={{ marginLeft: '12px' }}>
                        <ArrowBackIosIcon
                            sx={{
                                color: 'black',
                                fontSize: '20px',
                                ":hover": { transform: 'scale(1.2)', cursor: 'pointer' },
                            }}
                            onClick={date.getPreviousMonth}
                        />
                        <ArrowForwardIosIcon
                            sx={{
                                color: 'black',
                                fontSize: '20px',
                                ":hover": { transform: 'scale(1.2)', cursor: 'pointer' },
                            }}
                            onClick={date.getNextMonth}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, marginLeft: '12px' }}>
                        <Typography variant="h6" sx={{ color: 'black', fontSize: '22px' }}>
                            {date.month} {date.year}
                        </Typography>
                    </Box>
                </Toolbar>
                
            </AppBar>
        </Box>
        
    )
}

export default CalendarHeader;