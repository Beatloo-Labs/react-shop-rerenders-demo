interface ModalProps {
    onClose: () => void
    children: React.ReactNode
}

export const Modal = function Modal({ onClose, children }: ModalProps) {
    console.log('Modal render');

    return (
        <div 
        style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
        }}
        onClick={onClose}
        >
        <div 
            style={{ 
            position: 'fixed', 
            right: 20, 
            top: 80, 
            background: 'white',
            border: '1px solid #eee',
            borderRadius: 4,
            minWidth: 300,
            }}
            onClick={e => e.stopPropagation()}
        >
            {children}
        </div>
        </div>
    )
}