import styles from '../ui/Button.module.css';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	onSubmit?: () => void;
	variant?: 'submit' | 'delete' | 'reset';
	size?: 'sm' | 'md' | 'lg';
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
};

function Button({
	children,
	onClick,
	variant = 'submit',
	size = 'md',
	type = 'button',
	disabled = false,
	className = '',
}: ButtonProps) {
	const buttonClasses = [
		styles.btn,
		styles[variant],
		styles[size],
		disabled ? styles.disabled : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			onClick={onClick}
			className={buttonClasses}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
