// get the command line arguments
import trace from '#util/logging';
import chalk from 'chalk';
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

const common_config = {
    meta: {
        game_name: 'OnlineGame',
        version: 'v0.1',
        framework_version: 'v4.2',
        server: 'unknown'
    },
    
    lobby: {
        max_players: 100
    },
    
    timestamps_enabled: true,
    ws_enabled: true,
    
    tps: 60,
    db_enabled: true,
    starting_room: 'Test Room',
    necessary_login: false,
    ping_interval: 5 * 1000,
    room_rest_timeout: 5    // (seconds) - prevents rooms from processing entities
    // when no players are present for a certain amount of time
    // set to -1 to disable this feature
};

const prod_config = {
    meta: {
        server: 'production'
    },
    env_name: 'prod',
    ip: '0.0.0.0',
    port: args.port || 1337,
    ws_port: args.ws_port || 3000,
    
    ssl_enabled: false,
    ssl_cert_path: '/etc/letsencrypt/live/example.com/cert.pem',
    ssl_key_path: '/etc/letsencrypt/live/example.com/privkey.pem',
    
    db: args.db || 'mongodb://127.0.0.1:27017/online-game',
    // you can add a postfix at the end of the name to separate them
    shell_enabled: false,
    verbose_lag: false,
    
    initial_lobbies: 3
};


const dev_config = {
    meta: {
        server: 'development'
    },
    env_name: 'dev',
    ip: '127.0.0.1',
    //ip: '192.168.1.1', // you can put your machine's local ip here for LAN play
    port: args.port || 1338,
    ws_port: args.ws_port || 3001,
    
    ssl_enabled: false,
    ssl_cert_path: null,
    ssl_key_path: null,
    
    db: args.db || 'mongodb://127.0.0.1:27017/online-game',
    
    shell_enabled: true,
    verbose_lag: true,
    
    initial_lobbies: 1
};


const default_config = dev_config;
const env = args.env || 'dev';


const config = {};
Object.assign(config, common_config);

if (env === 'production' || env === 'prod' || args.prod) {
    Object.assign(config, prod_config);
}
else if (env === 'development' || env === 'dev' || args.dev) {
    Object.assign(config, dev_config);
}
else {
    Object.assign(config, default_config);
}


trace(chalk.blueBright('Config loaded! environment: ' + config.env_name));

global.config = config;
export default config;
