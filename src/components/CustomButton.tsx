import { motion } from "framer-motion"
import theme from "../theme"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    icon?: React.ReactNode;
    color?: string;
    hoverColor?: string;
    size?: 'small' | 'medium' | 'large';
}

export const CustomButton: React.FC<ButtonProps> = ({ children, onClick, icon, color, hoverColor, size }) => {
    const getSize = (size: 'small' | 'medium' | 'large') => {
        switch (size) {            
            case 'small': {
                return theme.spacing(12);
            }
            case 'medium': {
                return theme.spacing(15);
            }
            case 'large': {
                return theme.spacing(18);
            }
            default: {
                return '45px';
            }
        }
    };

    return (
        <motion.button
            className="custom-button-container"
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color ?? theme.palette.primary['500'],
                color: theme.palette.primary.dark,
                width: "75vw",
                height: getSize(size ?? 'medium'),
                margin: theme.spacing(2),
                borderRadius: theme.spacing(10),
                outline: "none",
                border: "none",
                cursor: "pointer",
                boxShadow: 'var(--shadow-elevation-high)',
                
            }}
            whileHover={{ 
                backgroundColor: hoverColor ?? theme.palette.primary['700'],
                transition: { duration: 0.2 }
            }}
            whileTap={{ y: 1 }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: "100%",
                    gap: theme.spacing(4),
                    padding: theme.spacing(2),
                }}
            >
                <motion.div
                    style={{ display: 'flex', alignItems: 'center' }}
                    whileInView={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    {icon || null}
                </motion.div>
                {children}
            </div>
        </motion.button>
    )
}