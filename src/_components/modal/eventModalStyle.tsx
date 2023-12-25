const popUpBoxStyle = {
    popupBox: {
        color: 'black',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        zIndex: 1030,
        borderRadius: '8px',
    },
    validationBox: {
        position: 'absolute',
        minWidth: '370px',
        maxWidth: '530px',
        height: '400px',
        maxHeight: '87vh',
        minHeight: 'fit-content',
        background: '#fff',
        borderRadius: '4px',
        padding: '10px',
        border: '1px solid #999',
        overflow: 'auto',
        top: '50%',
        left: '50%',
        boxShadow: '0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12), 0 11px 15px -7px rgba(0,0,0,.2)',
        transform: 'translate(-50%,-50%)',
    },

    closeIcon: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}

export default popUpBoxStyle;
