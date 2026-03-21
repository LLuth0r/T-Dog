import React, { useState } from "react";
import { motion } from 'motion/react';
import { useTheme } from '@mui/joy/styles';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useRegistration } from '../../context/RegistrationContext';

// Icon Imports
import { IconUser, IconMail, IconPlayerPlay } from '@tabler/icons-react';

// Component imports
import { AnimatePresence } from "motion/react";
import { CustomButton } from "../../components/CustomButton";
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Link from '@mui/joy/Link';

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    acceptTerms: boolean;
}

const Register: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [termsOpen, setTermsOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { completeRegistration } = useRegistration();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            acceptTerms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        // TODO: Replace with actual backend API call that registers the user
        // and returns a session token for payment authorization.
        // Example:
        //   const response = await api.register({
        //       firstName: data.firstName,
        //       lastName: data.lastName,
        //       email: data.email,
        //   });
        //   const { sessionToken } = response;
        const sessionToken = 'pending-backend-integration';

        completeRegistration(
            {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            },
            sessionToken,
        );

        setIsVisible(false);
        setTimeout(() => {
            navigate('/payment');
        }, 500);
    };

    const inputStyles = {
        '--Input-focusedThickness': '1px',
        '--Input-focusedHighlight': theme.palette.primary['500'],
        backgroundColor: theme.palette.primary.light + 20,
        borderColor: theme.palette.primary.light + 30,
        color: theme.palette.primary.light,
        width: '75vw',
        height: theme.spacing(15),
        borderRadius: theme.spacing(3),
        '& input': {
            color: theme.palette.primary.light,
            '&::placeholder': {
                color: theme.palette.primary.light + 50,
            },
        },
        '& .MuiInput-startDecorator': {
            color: theme.palette.primary['500'],
        },
    } as const;

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.background,
                            minHeight: '100vh',
                            minWidth: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'center',
                                gap: "16px",
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
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
                                level="body-md"
                                sx={{
                                    color: theme.palette.primary.light,
                                    marginBottom: theme.spacing(4),
                                }}
                            >
                                Register your recording
                            </Typography>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: theme.spacing(4),
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{ required: 'First name is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="First Name"
                                                startDecorator={<IconUser size={20} />}
                                                sx={inputStyles}
                                                error={!!errors.firstName}
                                            />
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Last Name"
                                                startDecorator={<IconUser size={20} />}
                                                sx={inputStyles}
                                                error={!!errors.lastName}
                                            />
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                                startDecorator={<IconMail size={20} />}
                                                sx={inputStyles}
                                                error={!!errors.email}
                                            />
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ width: '75vw', marginTop: theme.spacing(2) }}
                                >
                                    <Controller
                                        name="acceptTerms"
                                        control={control}
                                        rules={{ required: 'You must accept the terms and conditions' }}
                                        render={({ field }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                                                <Checkbox
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    sx={{
                                                        '& .MuiCheckbox-checkbox': {
                                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                                            backgroundColor: theme.palette.primary.light,

                                                            '&.Mui-checked': {
                                                                backgroundColor: theme.palette.primary[500],
                                                                borderColor: theme.palette.primary['500'],
                                                                color: theme.palette.primary.dark,
                                                            },
                                                        },
                                                    }}
                                                />
                                                <Typography
                                                    level="body-sm"
                                                    sx={{ color: theme.palette.primary.light }}
                                                >
                                                    I accept the{' '}
                                                    <Link
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setTermsOpen(true);
                                                        }}
                                                        sx={{
                                                            color: theme.palette.primary['500'],
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Terms and Conditions
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        )}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    style={{ marginTop: theme.spacing(4) }}
                                >
                                    <CustomButton
                                        onClick={handleSubmit(onSubmit)}
                                        icon={<IconPlayerPlay />}
                                        size="large"
                                    >
                                        <Typography level="body-md" sx={{
                                            color: theme.palette.primary.dark,
                                            fontWeight: "bold",
                                        }}>
                                            Continue
                                        </Typography>
                                    </CustomButton>
                                </motion.div>
                            </form>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>

            <Modal open={termsOpen} onClose={() => setTermsOpen(false)}>
                <ModalDialog
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.light,
                        maxHeight: '80vh',
                        overflow: 'auto',
                    }}
                >
                    <ModalClose
                        sx={{ color: theme.palette.primary.light }}
                    />
                    <DialogTitle
                        sx={{
                            color: theme.palette.primary.light,
                            fontWeight: 'bold',
                        }}
                    >
                        Terms and Conditions
                    </DialogTitle>
                    <DialogContent>
                        <Typography level="body-sm" sx={{ color: theme.palette.primary.light }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                        <Typography level="body-sm" sx={{ color: theme.palette.primary.light, mt: 2 }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <Typography level="body-sm" sx={{ color: theme.palette.primary.light, mt: 2 }}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Typography>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default Register;