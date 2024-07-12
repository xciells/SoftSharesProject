import React from 'react';

const DashboardContent = ({ user }) => {
    const isAdminGeral = user.id === 0;

    return (
        <div className="dashboard-content">
            <h2>Bem-vindo, {user.nome}</h2>
            {isAdminGeral ? (
                <p>Você tem acesso a todas as áreas.</p>
            ) : (
                <div>
                    <p>Você tem acesso às seguintes áreas:</p>
                    <ul>
                        {user.areas.map(area => (
                            <li key={area.id}>{area.nome}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DashboardContent;
