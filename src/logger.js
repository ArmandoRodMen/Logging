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
        fatal: "red",
        warning: "yellow",
        information: "green",
        error: "orange",
        http: "blue",
        debug: "purple",
    },
};

export let logger;

if (config.ENVIRONMENT === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                level: "info",
                filename: "logs-prod-file.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
            new winston.transports.File({
                level: "error",
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
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
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