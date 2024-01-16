import winston from "winston";
import config from "./config.js";

const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        information: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
        debug: "purple",
        http: "blue",
        information: "green",
        warning: "yellow",
        error: "orange",
        fatal: "red",
    },
};

export let logger;

if (config.ENVIRONMENT === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                level: "information", // Se mostrarán mensajes de nivel "infromation" y superiores
                filename: "logs-prod-file.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
            new winston.transports.File({
                level: "error", // Se mostrarán mensajes de nivel "error" y superiores
                filename: "errors.log", 
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
        ],
    });
} else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "debug", // Se mostrarán mensajes de nivel "debug" y superiores
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevels.colors }), // Aplicar colores a la consola
                    winston.format.simple() // Formato simple para los mensajes
                ),
            }),
        ],
    });
}



/*
export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "information",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors}), 
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            level: "warning",
            filename: "logs-file.log",
            fromat: winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
        }),
    ],
});

*/