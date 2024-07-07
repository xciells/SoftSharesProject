import React from 'react';

const DashboardContent = ({ user }) => {
    const isAdminGeral = user.id === 0;

    return (
        <div className="container-fluid">
            <h2>Bem-vindo, {user.nome}</h2>
            {isAdminGeral ? (
                <p>Você tem acesso a todas as áreas.</p>
            ) : (
                <p>Você tem acesso à área: {user.area_id}</p>
            )}
        </div>
    );
};

export default DashboardContent;
