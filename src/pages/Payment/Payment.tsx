import React, { useState } from "react";
import { motion } from 'motion/react';
import { useTheme } from '@mui/joy/styles';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useRegistration } from '../../context/RegistrationContext';

// Stripe imports — wrap the app with <Elements> from @stripe/react-stripe-js
// and pass a loadStripe instance for full Stripe integration
import { CardElement } from '@stripe/react-stripe-js';

// Icon Imports
import {
    IconCreditCard,
    IconUser,
    IconCalendar,
    IconLock,
    IconBrandApple,
    IconBrandPaypal,
    IconBrandGoogle,
    IconShieldCheck,
} from '@tabler/icons-react';

// Component imports
import { AnimatePresence } from "motion/react";
import { CustomButton } from "../../components/CustomButton";
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';

type PaymentMethod = 'credit_card' | 'apple_pay' | 'google_pay' | 'paypal';

interface PaymentFormData {
    paymentMethod: PaymentMethod;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}

const MONTHS = [
    { value: '01', label: '01 - Jan' },
    { value: '02', label: '02 - Feb' },
    { value: '03', label: '03 - Mar' },
    { value: '04', label: '04 - Apr' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - Jun' },
    { value: '07', label: '07 - Jul' },
    { value: '08', label: '08 - Aug' },
    { value: '09', label: '09 - Sep' },
    { value: '10', label: '10 - Oct' },
    { value: '11', label: '11 - Nov' },
    { value: '12', label: '12 - Dec' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 12 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i),
}));

const PAYMENT_METHODS = [
    { value: 'credit_card' as const, label: 'Credit / Debit Card', icon: <IconCreditCard size={20} /> },
    { value: 'apple_pay' as const, label: 'Apple Pay', icon: <IconBrandApple size={20} /> },
    { value: 'google_pay' as const, label: 'Google Pay', icon: <IconBrandGoogle size={20} /> },
    { value: 'paypal' as const, label: 'PayPal', icon: <IconBrandPaypal size={20} /> },
];

const Payment: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
    const theme = useTheme();
    const navigate = useNavigate();
    // sessionToken will be sent to the backend when API integration is complete
    const { registrationData, sessionToken: _sessionToken, clearRegistration } = useRegistration();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<PaymentFormData>({
        mode: 'onChange',
        defaultValues: {
            paymentMethod: 'credit_card',
            cardholderName: '',
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            cvv: '',
        },
    });

    const onSubmit = async (data: PaymentFormData) => {
        // TODO: Send payment to backend with the session token so the payment
        // is tied to the registered user. The backend should validate the token
        // and use it to associate the Stripe payment with the user's record.
        // Example:
        //   const response = await api.processPayment({
        //       sessionToken,
        //       registrationData,
        //       paymentMethod: data.paymentMethod,
        //   });
        //   await stripe.confirmCardPayment(response.clientSecret, { ... });
        console.log("Payment submitted for user:", registrationData?.email, data);

        clearRegistration();
        setIsVisible(false);
        setTimeout(() => {
            navigate('/confirmation');
        }, 500);
    };

    const formatCardNumber = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
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

    const selectStyles = {
        backgroundColor: theme.palette.primary.light + 20,
        borderColor: theme.palette.primary.light + 30,
        color: theme.palette.primary.light,
        width: '75vw',
        height: theme.spacing(15),
        borderRadius: theme.spacing(3),
        '& .MuiSelect-indicator': {
            color: theme.palette.primary['500'],
        },
        '& .MuiSelect-button': {
            color: theme.palette.primary.light,
        },
        '& .MuiSelect-startDecorator': {
            color: theme.palette.primary['500'],
        },
    } as const;

    const halfInputStyles = {
        ...inputStyles,
        width: 'calc(37.5vw - 6px)',
    } as const;

    const selectHalfStyles = {
        ...selectStyles,
        width: 'calc(37.5vw - 6px)',
    } as const;

    const listboxStyles = {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.light + 30,
        '& .MuiOption-root': {
            color: theme.palette.primary.light,
            '&[aria-selected="true"]': {
                backgroundColor: theme.palette.primary['700'],
                color: theme.palette.primary['500'],
            },
        },
    };

    const showCardFields = selectedMethod === 'credit_card';

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
                                    marginBottom: theme.spacing(2),
                                }}
                            >
                                Complete payment to start your recording session
                            </Typography>

                            {/* Order Summary Chip */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <Chip
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: theme.palette.primary.light + 20,
                                        borderColor: theme.palette.primary.light + 30,
                                        color: theme.palette.primary.light,
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        padding: theme.spacing(1, 5),
                                    }}
                                >
                                    Total: $9.99
                                </Chip>
                            </motion.div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: theme.spacing(4),
                                }}
                            >
                                {/* Payment Method Select */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onChange={(_e, newValue) => {
                                                    const val = newValue as PaymentMethod;
                                                    field.onChange(val);
                                                    setSelectedMethod(val);
                                                    setValue('paymentMethod', val);
                                                }}
                                                startDecorator={
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {PAYMENT_METHODS.find(m => m.value === selectedMethod)?.icon}
                                                    </Box>
                                                }
                                                sx={selectStyles}
                                                slotProps={{
                                                    listbox: { sx: listboxStyles },
                                                }}
                                            >
                                                {PAYMENT_METHODS.map((method) => (
                                                    <Option
                                                        key={method.value}
                                                        value={method.value}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            {method.icon}
                                                            {method.label}
                                                        </Box>
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    {showCardFields ? (
                                        <motion.div
                                            key="card-fields"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: theme.spacing(4),
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {/* Divider */}
                                            <Divider sx={{
                                                width: '75vw',
                                                '&::before, &::after': {
                                                    borderColor: 'rgba(255, 255, 255, 0.15)',
                                                },
                                            }}>
                                                <Typography
                                                    level="body-xs"
                                                    sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                                                >
                                                    CARD DETAILS
                                                </Typography>
                                            </Divider>

                                            {/* Cardholder Name */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <Controller
                                                    name="cardholderName"
                                                    control={control}
                                                    rules={{
                                                        required: showCardFields ? 'Cardholder name is required' : false,
                                                    }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            placeholder="Cardholder Name"
                                                            startDecorator={<IconUser size={20} />}
                                                            sx={inputStyles}
                                                            error={!!errors.cardholderName}
                                                        />
                                                    )}
                                                />
                                            </motion.div>

                                            {/* Card Number */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.35 }}
                                            >
                                                <Controller
                                                    name="cardNumber"
                                                    control={control}
                                                    rules={{
                                                        required: showCardFields ? 'Card number is required' : false,
                                                        pattern: {
                                                            value: /^[\d\s]{16,19}$/,
                                                            message: 'Enter a valid card number',
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            placeholder="1234 5678 9012 3456"
                                                            startDecorator={<IconCreditCard size={20} />}
                                                            sx={inputStyles}
                                                            error={!!errors.cardNumber}
                                                            onChange={(e) => {
                                                                field.onChange(formatCardNumber(e.target.value));
                                                            }}
                                                            slotProps={{
                                                                input: {
                                                                    inputMode: 'numeric',
                                                                    maxLength: 19,
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </motion.div>

                                            {/* Expiration Month & Year Row */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                                style={{
                                                    display: 'flex',
                                                    gap: theme.spacing(4),
                                                    width: '75vw',
                                                }}
                                            >
                                                <Controller
                                                    name="expirationMonth"
                                                    control={control}
                                                    rules={{
                                                        required: showCardFields ? 'Month is required' : false,
                                                    }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            placeholder="Month"
                                                            onChange={(_e, newValue) => {
                                                                field.onChange(newValue);
                                                            }}
                                                            startDecorator={<IconCalendar size={18} />}
                                                            sx={selectHalfStyles}
                                                            slotProps={{
                                                                listbox: { sx: listboxStyles },
                                                            }}
                                                        >
                                                            {MONTHS.map((month) => (
                                                                <Option key={month.value} value={month.value}>
                                                                    {month.label}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                                <Controller
                                                    name="expirationYear"
                                                    control={control}
                                                    rules={{
                                                        required: showCardFields ? 'Year is required' : false,
                                                    }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            placeholder="Year"
                                                            onChange={(_e, newValue) => {
                                                                field.onChange(newValue);
                                                            }}
                                                            startDecorator={<IconCalendar size={18} />}
                                                            sx={selectHalfStyles}
                                                            slotProps={{
                                                                listbox: { sx: listboxStyles },
                                                            }}
                                                        >
                                                            {YEARS.map((year) => (
                                                                <Option key={year.value} value={year.value}>
                                                                    {year.label}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                            </motion.div>

                                            {/* CVV */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.45 }}
                                            >
                                                <Controller
                                                    name="cvv"
                                                    control={control}
                                                    rules={{
                                                        required: showCardFields ? 'CVV is required' : false,
                                                        pattern: {
                                                            value: /^\d{3,4}$/,
                                                            message: 'Enter a valid CVV',
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            placeholder="CVV"
                                                            type="password"
                                                            startDecorator={<IconLock size={20} />}
                                                            sx={halfInputStyles}
                                                            error={!!errors.cvv}
                                                            slotProps={{
                                                                input: {
                                                                    inputMode: 'numeric',
                                                                    maxLength: 4,
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="alt-payment"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: theme.spacing(4),
                                                padding: theme.spacing(4),
                                            }}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: 2,
                                                borderRadius: theme.spacing(3),
                                                width: '75vw',
                                            }}>
                                                {PAYMENT_METHODS.find(m => m.value === selectedMethod)?.icon &&
                                                    React.cloneElement(
                                                        PAYMENT_METHODS.find(m => m.value === selectedMethod)!.icon,
                                                        { size: 48, color: theme.palette.primary['500'] }
                                                    )
                                                }
                                                <Typography
                                                    level="body-md"
                                                    sx={{ color: theme.palette.primary.light, textAlign: 'center' }}
                                                >
                                                    You'll be redirected to{' '}
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            color: theme.palette.primary['500'],
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {PAYMENT_METHODS.find(m => m.value === selectedMethod)?.label}
                                                    </Typography>
                                                    {' '}to complete your payment securely.
                                                </Typography>
                                            </Box>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Security Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 3,
                                    }}>
                                        <IconShieldCheck
                                            size={16}
                                            color={theme.palette.primary['500']}
                                        />
                                        <Typography
                                            level="body-xs"
                                            sx={{ color: theme.palette.primary.light }}
                                        >
                                            Secured with Stripe encryption
                                        </Typography>
                                    </Box>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    style={{ marginTop: theme.spacing(2) }}
                                >
                                    <CustomButton
                                        onClick={handleSubmit(onSubmit)}
                                        icon={PAYMENT_METHODS.find(m => m.value === selectedMethod)?.icon}
                                        size="large"
                                    >
                                        <Typography level="body-md" sx={{
                                            color: theme.palette.primary.dark,
                                            fontWeight: "bold",
                                        }}>
                                            {showCardFields ? 'Pay $9.99' : `Continue with ${PAYMENT_METHODS.find(m => m.value === selectedMethod)?.label}`}
                                        </Typography>
                                    </CustomButton>
                                </motion.div>
                            </form>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>
        </>
    );
};

export default Payment;
