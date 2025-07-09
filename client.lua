local hunger = 100
local thirst = 100
local menuOpen = false

RegisterCommand("hud", function()
    if not menuOpen then
        SetNuiFocus(true, true)
        SendNUIMessage({ action = "openMenu" })
        menuOpen = true
    else
        SetNuiFocus(false, false)
        SendNUIMessage({ action = "closeMenu" })
        menuOpen = false
    end
end)

RegisterNUICallback("saveSettings", function(data, cb)
    SendNUIMessage({
        action = "applySettings",
        hungerVisible = data.hunger,
        thirstVisible = data.thirst,
        colorHunger = data.colorHunger,
        colorThirst = data.colorThirst
    })

    SetNuiFocus(false, false)
    menuOpen = false
    cb("ok")
end)

CreateThread(function()
    while true do
        Wait(1000)

        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            local newHunger = math.floor(status.val / 10000)
            if newHunger > hunger then
                SendNUIMessage({ action = "animate", type = "hunger" })
            end
            hunger = newHunger
        end)

        TriggerEvent('esx_status:getStatus', 'thirst', function(status)
            local newThirst = math.floor(status.val / 10000)
            if newThirst > thirst then
                SendNUIMessage({ action = "animate", type = "thirst" })
            end
            thirst = newThirst
        end)

        SendNUIMessage({
            action = "updateStatus",
            hunger = hunger,
            thirst = thirst
        })
    end
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function()
    Wait(3000)
    SendNUIMessage({ action = "showHud" })
    SetNuiFocus(false, false)
end)
