import React, { useState } from "react";
import { motion } from 'motion/react';
import { useTheme } from '@mui/joy/styles';
import { useNavigate } from 'react-router-dom';

// Asset Imports
import bgImage from '../../assets/images/renith-r-A9VpotrPr1k-unsplash.jpg';
import { IconBallTennis } from '@tabler/icons-react';

// Component imports
import { AnimatePresence } from "motion/react"
import { CustomButton } from "../../components/CustomButton"
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'

const Home: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleRouteToRegister = () => {
        setIsVisible(false);
        setTimeout(() => {
            navigate('/register');
        }, 500); // Match this duration with the exit animation duration
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <Box
                    sx={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        minWidth: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: theme.palette.primary.dark + 70, // Adjust opacity as needed
                            zIndex: 1,
                        },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0,scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: 'center',
                            height: "75vh",
                            gap: "12px",
                            position: 'relative',
                            zIndex: 2,
                        }}>
                        <Typography
                            level="title-lg"
                            sx={{
                                color: theme.palette.primary.light,
                                fontFamily: theme.typography.hero,
                                fontSize: "4rem",
                            }}
                        >
                            TDog
                        </Typography>
                        <Typography
                            level="body-lg"
                            sx={{
                                color: theme.palette.primary.light,
                                width: "75vw",
                                marginTop: theme.spacing(12),
                                fontWeight: "bold"
                            }}>
                            Play like the Pros. Improve your technique with game film.
                        </Typography>
                        <CustomButton
                            onClick={handleRouteToRegister}
                            icon={<IconBallTennis/>}
                            size="large"
                        >
                            <Typography
                                level="body-md"
                                sx={{
                                    color: theme.palette.primary.dark,
                                    fontWeight: "bold",
                                }}
                            >
                                Get Started
                            </Typography>
                        </CustomButton>
                    </motion.div>
                </Box>
            )}
        </AnimatePresence>
    );
};

export default Home;