local QBCore = exports['qb-core']:GetCoreObject()

Citizen.CreateThread(function() 
    while true do
        Citizen.Wait(10)
        if QBCore == nil then
            TriggerEvent("QBCore:GetObject", function(obj) QBCore = obj end)    
            Citizen.Wait(200)
        end
    end
end)

RegisterNetEvent('discord:client:tele')
AddEventHandler('discord:client:tele', function(pos, discordName)
    local ped = PlayerPedId()
    print(type(pos.x))
    SetEntityCoords(ped, tonumber(pos.x), tonumber(pos.y), tonumber(pos.z), 0.0, 0.0, 0.0, false)
    QBCore.Functions.Notify(("You have been teleported by : %s"):format(discordName))
end)

RegisterNetEvent('discord:client:teleto')
AddEventHandler('discord:client:teleto', function(posName, discordName)
    if config.TelePosition[posName] then 
        local ped = PlayerPedId()
        SetEntityCoords(ped, config.TelePosition[posName].x, config.TelePosition[posName].y, config.TelePosition[posName].z, 0.0, 0.0, 0.0, false)
    end
end)

RegisterNetEvent('discord:client:slay')
AddEventHandler('discord:client:slay', function(discordName)
    local ped = PlayerPedId()
    SetEntityHealth(ped, 0)
    QBCore.Functions.Notify(("You were kill by admin %s"):format(discordName))
end)